<template>
  <div :class="`file has-name is-boxed ${!category && !isEditing && 'is-warning'}`">
    <component :is="href && !isEditing ? 'a' : 'div'" :href="href" target="_blank" :download="name" class="file-label" :title="!isEditing && `Ouvrir ${name}`">
      <span class="file-cta">
        <span class="file-icon has-label">
          <component :is="iconTag"></component>
        </span>
        <div v-if="isUploading" class="progress-label">Envoi en cours…</div>
        <span class="file-type">
          <strong>Type : </strong>
          <div v-if="isEditing">
            <div class="select">
              <select class="is-focused">
                <option v-for="(label, value) in categories" :value="value" :checked="value === category">{{label}}</option>
              </select>
            </div>
          </div>
          <span v-else>{{category || 'Inconnu'}}</span>
        </span>
      </span>
      <span :class="`file-name ${onEdit ? 'is-editable' : ''}`">
        <input v-if="isEditing" type="text" :value="name" class="input is-focused" autofocus="">
        <span v-else>{{name}}</span>
      </span>
    </component>
    <button v-if="onEdit" :class="`edit button is-medium ${isEditing ? 'is-primary' : 'is-default'}`" @click="toggleIsEditing()" :title="isEditing ? 'Enregistrer' : `Modifier ${name}`">
      <span v-if="!isEditing">🖉</span>
      <span v-else>✔</span>
    </button>
    <button v-if="onRemove && !isEditing" class="delete is-medium" @click="remove()" :title="`Supprimer ${name}`"></button>
    <button v-if="isEditing" class="delete is-medium" @click="setIsEditing(false)" title="Annuler"></button>
  </div>
</template>

<script type="text/javascript">
  import {capitalize} from 'avril/js/utils/string';
  import UploadIcon from 'avril/images/icons/upload.svg';
  import DocumentIcon from 'avril/images/icons/document.svg';
  import EditIcon from 'avril/images/icons/pencil.svg';

  export default {
    components: {
      DocumentIcon,
      EditIcon,
      UploadIcon,
    },
    computed: {
      iconTag: function() {
        return `${capitalize(this.icon)}Icon`;
      },
    },
    data: function() {
      return {
        isEditing: false,
        categories: {
          resume: 'CV',
          id: 'Pièce d\'identité',
          certification: 'Diplôme',
          payslip: 'Fiche de paie',
          other: 'Autre',
        }
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
          this.onEdit(this.id);
        }
      },
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