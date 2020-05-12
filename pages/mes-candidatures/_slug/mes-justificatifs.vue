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
            <file-upload
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
  import {mutateApiMultipart} from 'avril/js/utils/api';
  import UploadIcon from 'avril/images/icons/upload.svg';
  import DocumentIcon from 'avril/images/icons/document.svg';

  // const uploadFile = (dispatch, application) => async file => {
  //   const updatedApplication = await mutateApiMultipart({
  //     name: 'uploadResume',
  //     params: {
  //       id: application.id,
  //       resume: 'file',
  //     },
  //     type: 'application',
  //   }, file.file);

  //   dispatch('applications/updateAndInform', {
  //     ...updatedApplication,
  //     savedMessage: `Le justificatif ${file.name} a bien été enregistré.`,
  //   });
  // }

  export default {
    computed: {
      uploadedFiles: function() {
        return this.application.resumes || [{
          filename: 'CV.pdf',
          url: 'http://test.com/cv.pdf',
          id: 1,
        }];
      },
    },
    components: {
      File,
      FileUpload,
      DocumentIcon,
      UploadIcon,
    },
    data: function() {
      return {
        content,
        uploadingFiles: [],
      }
    },
    methods: {
      progress: function(file) {
        return `${parseInt(file.progress)}%`;
      },
      addUploadingFile: async function(files) {
        await Promise.all(files.map(async file => {
          this.uploadingFiles.push(file);
          const updatedApplication = await mutateApiMultipart({
            name: 'uploadResume',
            params: {
              id: this.application.id,
              resume: 'file',
            },
            type: 'application',
          }, file.file);
          this.uploadingFiles.splice(this.uploadingFiles.findIndex(f => f.id === file.id), 1)
          this.$store.dispatch('applications/updateAndInform', {
            ...updatedApplication,
            savedMessage: `Le justificatif ${file.name} a bien été envoyé.`,
          });
        }));
      },
      removeFile: async function(file) {
        if (window.confirm(`Confirmez-vous la suppression de ${file.filename} ?`)) {
          const application = await mutateApi({
            name: 'removeResume',
            params: {
              input: {
                applicationId: this.application.id,
                resumeId: file.id,
              }
            },
            type: 'application',
          });
          this.$store.dispatch('applications/updateAndInform', {
            ...application,
            savedMessage: 'Le justificatif a bien été supprimé.',
          });
        }
      }
    },
    props: {
      application: {
        type: Object
      }
    },
  }
</script>

