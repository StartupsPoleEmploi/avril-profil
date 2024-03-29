<template>
  <div class="candidature-detail">
    <h1 class="title is-1 is-spaced">Mes pièces jointes</h1>
    <p class="subtitle">Déposez vos documents sur notre plateforme sécurisée</p>

    <div v-html="content" class="content" v-if="hasBookletFinished" />

    <div class="notification is-info">
      <p><strong>Avril vous donne un conseil</strong> :</p>
      Avril vous invite à fournir votre CV aussi. Pourquoi ? Parce que votre CV viendra compléter votre candidature et apportera des informations utiles au certificateur pour étudier votre candidature.
    </div>

    <div class="files-zone">
      <h2 class="title is-4 is-spaced">
        {{capitalize(pluralize(uploadedFiles.length, 'fichier déposé'))}} :</h2>
      <div class="file-list">
        <File v-for="file in uploadingFiles" :file="file" :key="file.id" :is-uploading="true" />
        <File v-for="file in uploadedFiles" :file="file" :key="file.id" :onRemove="removeFile" :onEdit="editFile" :isNew="isNewlyUpdate(file)" />
        <div class="file has-name is-boxed is-info">
          <label class="file-label">
            <FileUpload
              class="file-input"
              extensions="pdf,doc,docx,jpg,jpeg"
              accept="application/pdf,application/msword,image/jpeg"
              :size="10 * 1024 * 1024"
              v-model="uploadingFiles"
              :multiple="true"
              :drop="true"
              @input="addUploadingFile"
            />
            <span class="file-cta">
              <span class="file-icon">
                <PlusIcon />
              </span>
            </span>
            <span class="file-name">
              Ajouter un ou plusieurs fichiers …
            </span>
          </label>
        </div>
      </div>
      <ul>
        <li>Taille maximale : <strong>10 Mo</strong></li>
        <li>Formats acceptés : <strong>pdf, doc, docx, jpg, jpeg</strong></li>
      </ul>
      <div class="level">
        <div class="level-left">
          <nuxt-link :disabled="!uploadedFiles.length" :to="applicationPath" class="button is-primary is-rounded">J'ai fini d'ajouter des pièces jointes</nuxt-link>
        </div>
        <div class="level-right">
          <nuxt-link :to="applicationPath" class="button is-text is-rounded">{{uploadedFiles.length ? 'Je terminerai plus tard' : 'Je le ferai plus tard'}}</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js';
  import File from '~/components/File.vue';
  import Message from '~/components/Message';
  import content from '~/contents/justificatifs.md';
  import {first} from 'avril/js/utils/array';
  import {pluralize, capitalize} from 'avril/js/utils/string';
  import {mutateApi, mutateApiMultipart} from 'avril/js/utils/api';
  import PlusIcon from 'avril/images/icons/plus.svg';
  import {path, hasBookletFinished} from '~/utils/application';

  export default {
    computed: {
      uploadedFiles: function() {
        return this.application.resumes;
      },
      applicationPath: function() {
        return path(this.application);
      },
      hasBookletFinished: function() {
        return hasBookletFinished(this.application)
      },
    },
    components: {
      File,
      FileUpload,
      Message,
      PlusIcon,
    },
    data: function() {
      return {
        content,
        uploadingFiles: [],
        justUploadedFiles: [],
      }
    },
    methods: {
      isNewlyUpdate: function(file) {
        return this.justUploadedFiles.includes(file.filename);
      },
      addUploadingFile: async function(files) {
        await Promise.all(files.map(async file => {
          try {
            const updatedApplication = await mutateApiMultipart({
              name: 'uploadResume',
              params: {
                id: this.application.id,
                resume: 'file',
              },
              type: 'application',
            }, file.file);
            this.$store.dispatch('applications/updateAndInform', updatedApplication);
            this.$store.commit('setFeedback', {
              message: `Le justificatif ${file.name} a bien été ajouté.`,
            })
            this.justUploadedFiles.push(file.name);
          } catch(err) {
            this.$store.commit('setApiErrorFeedback', {err, message: `Le justificatif ${file.name} n'a pas pu être envoyé`});
          }
          const fileIndex = this.uploadingFiles.findIndex(f => f.id === file.id);
          this.uploadingFiles.splice(fileIndex, 1);
        }));
      },
      editFile: async function(id, params) {
        try {
          const file = await mutateApi({
            name: 'editResume',
            params: {
              id,
              params,
            },
            type: 'resume',
          });
          this.$store.dispatch('applications/updateAndInform', {
            ...this.application,
            resumes: this.application.resumes.map(r => (r.id === id ? file : r)),
          });
          this.$store.commit('setFeedback', {
            message: `Le justificatif a bien été modifié.`,
          })
        } catch(err) {
          this.$store.commit('setApiErrorFeedback', {err, message: 'Le fichier n\'a pas pu être modifié'});
        }
      },
      removeFile: async function(id) {
        try {
          const file = await mutateApi({
            name: 'deleteResume',
            params: {
              id,
            },
            type: 'resume',
          });
          this.$store.dispatch('applications/updateAndInform', {
            ...this.application,
            resumes: this.application.resumes.filter(r => r.id !== file.id),
          });
          this.$store.commit('setFeedback', {
            message: `Le justificatif a bien été supprimé.`,
          })
        } catch(err) {
          this.$store.commit('setApiErrorFeedback', {err, message: 'Le fichier n\'a pas pu être supprimé'});
        }
      },
      capitalize,
      pluralize,
    },
    props: {
      application: {
        type: Object
      }
    },
  }
</script>

<style lang="scss" scoped>
  .level {
    margin-top: 2rem;
  }
</style>