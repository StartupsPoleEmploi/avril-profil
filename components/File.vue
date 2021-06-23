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
        />
        <span v-else>{{name}}</span>
      </span>
    </component>
    <button v-if="onEdit" :class="`button is-medium is-edit ${isEditing ? 'is-primary' : 'is-default'}`" @click="toggleIsEditing()" :title="isEditing ? 'Enregistrer' : `Modifier ${name}`">
      <span v-if="!isEditing">🖉</span>
      <span v-else>✔</span>
    </button>
    <button v-if="onRemove && !isEditing" class="button is-danger is-medium is-delete" @click="remove()" :title="`Supprimer ${name}`"><span>⨯</span></button>
    <button v-if="isEditing" class="button is-delete is-default is-medium" @click="setIsEditing(false)" title="Annuler"><span>⨯</span></button>
  </div>
</template>

<script type="text/javascript">
  import VueTextareaAutosize from 'vue-textarea-autosize'

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
      toggleIsEditing: function() {
        this.isEditing = !this.isEditing;
        if (!this.isEditing) {
          this.onEdit(this.id, {
            name: this.editingName,
            category: this.editingCategory,
          });
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