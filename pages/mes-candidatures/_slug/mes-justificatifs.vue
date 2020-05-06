<template>
  <div class="candidature-detail">
    <h1 class="title is-1 is-spaced">Mes justificatifs</h1>
    <p class="subtitle">Déposez vos documents sur notre plateforme sécurisée</p>

    <div v-html="content" class="content" />

    <div class="files-zone">
      <h2 class="title is-2 is-spaced">Mes fichiers</h2>
      <div class="file has-name is-boxed">
        <label class="file-label">
          <file-upload
            class="file-input"
            extensions="pdf,doc,docx"
            :size="10 * 1024 * 1024"
            v-model="files"
            :multiple="true"
            :drop="true"
            @input="uploadFile"
          />
          <span class="file-cta">
            <span class="file-icon">
              <UploadIcon />
            </span>
          </span>
          <span class="file-name" style="justify-content: center;">
            {{file ? file.name : 'Ajouter un fichier…'}}
          </span>
        </label>
      </div>
    </div>



  </div>
</template>

<script>
  import FileUpload from 'vue-upload-component/dist/vue-upload-component.part.js';
  import content from '~/contents/justificatifs.md';
  import UploadIcon from 'avril/images/icons/upload.svg';
  import {first} from 'avril/js/utils/array';
  import {mutateApi} from 'avril/js/utils/api';

  export default {
    computed: {
      file: function() {
        return first(this.files)
      }
    },
    components: {
      FileUpload,
      UploadIcon,
    },
    data: function() {
      return {
        content,
        files: [],
      }
    },
    methods: {
      uploadFile: async function(files) {
        this.files = files;
      }
    },
    props: {
      application: {
        type: Object
      }
    },
  }
</script>

<style scoped lang="scss">
  @import '~avril/scss/variables';

  .files-zone {
    background: $white;
    border-radius: $radius;
    padding: .5rem;
    @include tablet {
      padding: 2rem;
    }
  }

  .file.is-boxed {
    .file-icon {
      height: 5rem;
      width: 3rem;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
