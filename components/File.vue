<template>
  <div class="file has-name is-boxed">
    <component :is="href ? 'a' : 'div'" :href="href" :download="name" class="file-label" :title="`Télécharger ${name}`">
      <span class="file-cta">
        <span class="file-icon has-label">
          <component :is="iconTag"></component>
        </span>
        <div v-if="isUploading" class="progress-label">Envoi en cours…</div>
      </span>
      <span class="file-name">
        {{name}}
      </span>
    </component>
    <a v-if="onRemove" class="delete" @click="remove()" :title="`Supprimer ${name}`"></a>
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
    methods: {
      remove: function() {
        if (window.confirm(`Confirmez-vous la suppression de ${this.name} ?`)) {
          this.onRemove(this.id);
        }
      },
    },
    props: {
      id: {},
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
      },
      href: {
        type: String,
      }
    }
  }
</script>