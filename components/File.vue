<template>
  <div :class="`file has-name is-boxed ${!category && !isEditing && 'is-'}`">
    <component :is="href && !isEditing ? 'a' : 'div'" :href="href" target="_blank" :download="name" class="file-label" :title="!isEditing && `Ouvrir ${name}`">
      <span class="file-cta">
        <span class="file-icon has-label">
          <component :is="iconTag"></component>
        </span>
        <div v-if="isUploading" class="progress-label">Envoi en cours …</div>
        <span class="file-type">
          <div v-if="isEditing">
            <div class="select is-small">
              <select class="is-focused" v-model="editingCategory">
                <option disabled value="">Choisissez un type ...</option>
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
          v-model="editingName"
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
        return `${capitalize(this.icon)}Icon`;
      },
    },
    data: function() {
      return {
        isEditing: false,
        editingName: this.name || '',
        editingCategory: this.category || '',
        categories: resumeCategories,
      };
    },
    methods: {
      remove: function() {
        if (window.confirm(`Confirmez-vous la suppression de ${this.name} ?`)) {
          this.onRemove(this.id);
        }
      },
      setIsEditing: function(val) {
        this.isEditing = val;
      },
      doEdit: function() {
        const extension = last(this.name.split('.'));
        const extensionRegex = new RegExp(`\\\.${extension}$`);
        const editingNameWithExtention = `${this.editingName.trim().replace(extensionRegex, '')}.${extension}`;
        console.log({
          extension,
          extensionRegex,
          editingNameWithExtention,
        })
        if (editingNameWithExtention !== this.name && this.editingCategory !== this.category) {
          this.onEdit(this.id, {
            name: editingNameWithExtention,
            category: this.editingCategory,
          });
        }
        this.isEditing = false;
      },
      listenForEnter: function(e) {
        if (e.key === 'Enter' && !e.ctrlKey) {
          this.doEdit();
        }
      },
      resumeCategory,
    },
    props: {
      id: {},
      name: {
        type: String,
        isRequired: true
      },
      category: {
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
      onEdit:{
        type: Function,
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