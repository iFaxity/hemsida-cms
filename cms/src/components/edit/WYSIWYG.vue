<template lang="pug">
.ql-wrapper
  div(ref="editor")
</template>

<style lang="scss">
.ql-wrapper {
  background: #fff;
}

.ql-container {
  height: 250px;
}
</style>

<script>
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
//import './quill-image';

const TOOLBAR_OPTS = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],
  [{ 'size': ['small', false, 'large', 'huge'] }]
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ['link', /*'image',*/ 'blockquote', 'clean'],
];

// Debounce function for text-change
function debounce(fn, delay = 0) {
  let timeoutId = null
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(_ => fn(...args), delay);
  }
}

export default {
  props: {
    label: String,
    value: String,
  },

  mounted() {
    const { editor } = this.$refs;
    const quill = new Quill(editor, {
      theme: 'snow',
      modules: {
        toolbar: TOOLBAR_OPTS,
        /*imageUploader: {
          // return a Promise that resolves in a link to the uploaded image
          upload: this.uploadImage.bind(this),
        }*/
      }
    });

    // Update vue model
    quill.on('text-change', debounce((delta, oldDelta, source) => {
      this.$emit('input', this.quill.root.innerHTML);
    }, 10));

    // Set initial html value
    quill.root.innerHTML = this.value;
    this.quill = quill;
  },
  beforeDestroy() {
    this.quill = null;
  },

  /*methods: {
    async uploadImage(file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const data = await this.$api.put('/files/add', formData);

        return `/api/files/${data.path}`; // Must resolve as a link to the image
      } catch (ex) {
        throw new Error('Image was not uploaded');
      }
    },
  },*/
};
</script>
