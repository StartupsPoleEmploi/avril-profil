<template>
  <div class="file has-name is-boxed">
    <component :is="!isUploading && !isEditing ? 'a' : 'div'" :href="file.url" target="_blank" :download="name" class="file-label" :title="!isEditing && `Ouvrir ${name}`">
      <span class="file-cta">
        <span class="file-icon has-label">
          <component :is="iconTag"></component>
        </span>
        <div v-if="isUploading" class="progress-label">Envoi en cours …</div>
        <span class="file-type">
          <div v-if="isEditing">
            <div class="select is-small">
              <select class="is-focused" v-model="category">
                <option disabled value="">Choisissez un type …</option>
                <option v-for="(label, value) in categories" :value="value">{{label}}</option>
              </select>
            </div>
          </div>
          <span v-else>
            <span v-if="category" class="tag is-info">{{resumeCategory(category)}}</span>
            <span v-else class="tag is-warning">Type inconnu</span>
          </span>
        </span>
      </span>
      <span :class="`file-name ${onEdit ? 'is-editable' : ''}`">
        <textarea-autosize
          v-if="isEditing"
          ref="myTextarea"
          v-model="name"
          :min-height="30"
          :max-height="350"
          autofocus=""
          class="input is-focused"
          v-on:keyup.native="listenForEnter"
        />
        <span v-else>{{name}}</span>
      </span>
    </component>
    <div v-if="isEditing">
      <button class="button is-medium is-default is-left" @click="setIsEditing(false)" title="Annuler">
        <span>⨯</span>
      </button>
      <button class="button is-medium is-primary is-right" @click="doEdit()" title="Enregistrer">
        <span>✔</span>
      </button>
    </div>
    <div v-else>
      <button v-if="onEdit" class="button is-medium is-default is-left" @click="setIsEditing(true)" :title="`Modifier ${name}`">
        <span>🖉</span>
      </button>
      <button v-if="onRemove" class="button is-danger is-medium is-right" @click="remove()" :title="`Supprimer ${name}`">
        <span>⨯</span>
      </button>
    </div>
  </div>
</template>

<script type="text/javascript">
  import VueTextareaAutosize from 'vue-textarea-autosize'

  import {last} from 'avril/js/utils/array';
  import {capitalize} from 'avril/js/utils/string';
  import UploadIcon from 'avril/images/icons/upload.svg';
  import DocumentIcon from 'avril/images/icons/document.svg';
  import EditIcon from 'avril/images/icons/pencil.svg';
  import {resumeCategories, resumeCategory} from '~/utils/application';

  export default {
    components: {
      DocumentIcon,
      EditIcon,
      UploadIcon,
      VueTextareaAutosize,
    },
    computed: {
      iconTag: function() {
        if (this.isUploading) return 'UploadIcon';
        return 'DocumentIcon';
      },
    },
    data: function() {
      return {
        isEditing: this.isNew,
        name: this.file.name || this.file.filename,
        category: this.file.category || '',
        categories: resumeCategories,
      };
    },
    methods: {
      remove: function() {
        if (window.confirm(`Confirmez-vous la suppression de ${this.name} ?`)) {
          this.onRemove(this.file.id);
        }
      },
      setIsEditing: function(val) {
        this.isEditing = val;
      },
      doEdit: function() {
        const extension = last(this.file.filename.split('.'));
        const extensionRegex = new RegExp(`\\\.${extension}$`);
        const nameWithExtention = `${this.name.trim().replace(extensionRegex, '')}.${extension}`;
        this.name = nameWithExtention;
        this.onEdit(this.file.id, {
          name: this.name,
          category: this.category,
        });
        this.isEditing = false;
      },
      listenForEnter: function(e) {
        if (e.key === 'Enter' && !e.ctrlKey) {
          e.preventDefault();
          this.doEdit();
        }
      },
      resumeCategory,
    },
    props: {
      file: {
        type: Object,
        isRequired: true,
      },
      isUploading: {
        type: Boolean,
        default: false,
      },
      isNew: {
        type: Boolean,
        default: false,
      },
      onEdit:{
        type: Function,
      },
      onRemove:{
        type: Function,
      },
    }
  }
</script>