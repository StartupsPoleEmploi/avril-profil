<template>
  <div class="candidature-detail">
    <h1 class="title is-1 is-spaced">Mes justificatifs</h1>
    <p class="subtitle">Déposez vos documents sur notre plateforme sécurisée</p>

    <div v-html="content" class="content" />

    <div class="files-zone">
      <h2 class="title is-2 is-spaced">Mes fichiers</h2>
      <div class="file-list">
        <div class="file has-name is-boxed">
          <label class="file-label">
            <FileUpload
              class="file-input"
              extensions="pdf,doc,docx"
              :size="10 * 1024 * 1024"
              v-model="uploadingFiles"
              :multiple="true"
              :drop="true"
              @input="addUploadingFile"
            />
            <span class="file-cta">
              <span class="file-icon">
                <UploadIcon />
              </span>
            </span>
            <span class="file-name">
              Ajouter un fichier…
            </span>
          </label>
        </div>
        <File v-for="file in uploadingFiles" :key="file.id" :name="file.name" :is-uploading="true" />
        <File v-for="file in uploadedFiles" :key="file.id" :name="file.filename" icon="document" :id="file.id" :onRemove="removeFile" />
      </div>
    </div>
  </div>
</template>

<script>
  import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js';
  import File from '~/components/File.vue';
  import content from '~/contents/justificatifs.md';
  import {first} from 'avril/js/utils/array';
  import {pluralize} from 'avril/js/utils/string';
  import {mutateApi, mutateApiMultipart} from 'avril/js/utils/api';
  import UploadIcon from 'avril/images/icons/upload.svg';

  export default {
    computed: {
      uploadedFiles: function() {
        return this.application.resumes;
      },
    },
    components: {
      File,
      FileUpload,
      UploadIcon,
    },
    data: function() {
      return {
        content,
        uploadingFiles: [],
      }
    },
    methods: {
      addUploadingFile: async function(files) {
        await Promise.all(files.map(async file => {
          const updatedApplication = await mutateApiMultipart({
            name: 'uploadResume',
            params: {
              id: this.application.id,
              resume: 'file',
            },
            type: 'application',
          }, file.file);
          const fileIndex = this.uploadingFiles.findIndex(f => f.id === file.id);
          this.uploadingFiles.splice(fileIndex, 1);
          this.$store.dispatch('applications/updateAndInform', {
            ...updatedApplication,
            savedMessage: `Le justificatif ${file.name} a bien été envoyé.`,
          });
        }));
      },
      removeFile: async function(id) {
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
          savedMessage: 'Le justificatif a bien été supprimé.',
        });
      }
    },
    props: {
      application: {
        type: Object
      }
    },
  }
</script>

