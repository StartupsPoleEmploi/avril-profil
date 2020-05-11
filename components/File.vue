<template>
  <div class="file has-name is-boxed">
    <div class="file-label">
      <span class="file-cta">
        <span class="file-icon has-label">
          <component :is="iconTag"></component>
        </span>
        <div v-if="isUploading" class="progress-label">Envoi en cours…</div>
      </span>
      <span class="file-name" :title="name">
        {{name}}
      </span>
    </div>
    <a v-if="onRemove" class="delete" @click="onRemove(id)"></a>
  </div>
</template>

<script type="text/javascript">
  import {capitalize} from 'avril/js/utils/string';
  import UploadIcon from 'avril/images/icons/upload.svg';
  import DocumentIcon from 'avril/images/icons/document.svg';

  export default {
    components: {
      DocumentIcon,
      UploadIcon,
    },
    computed: {
      iconTag: function() {
        return `${capitalize(this.icon)}Icon`;
      },
    },
    props: {
      id: {
        type: Number,
      },
      name: {
        type: String,
        isRequired: true
      },
      icon: {
        type: String,
        default: 'upload',
      },
      isUploading: {
        type: Boolean,
        default: false,
      },
      onRemove:{
        type: Function,
      }
    }
  }
</script>