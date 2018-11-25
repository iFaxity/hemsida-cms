import Quill from 'quill';

import './blot';
import './styles.css';

class ImageUploader {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options;
        this.range = null;

        if (typeof options.upload != 'function') {
            console.warn('[Missing config] upload function that returns a promise is required');
        }

        const toolbar = this.quill.getModule('toolbar');
        toolbar.addHandler('image', this.selectLocalImage.bind(this));
    }

    selectLocalImage() {
        this.range = this.quill.getSelection();
        this.fileHolder = document.createElement('input');
        this.fileHolder.setAttribute('type', 'file');
        this.fileHolder.setAttribute('accept', 'image/*');

        this.fileHolder.onchange = this.fileChanged.bind(this);
        this.fileHolder.click();
    }

    async fileChanged() {
        const file = this.fileHolder.files[0];
        const fileReader = new FileReader();

        fileReader.addEventListener('load', () => {
            this.insertBase64Image(fileReader.result);
        }, false);

        if (file) {
            fileReader.readAsDataURL(file);
        }

        try {
            const imgUrl = await this.options.upload(file);
            this.insertToEditor(imgUrl);
        } catch (ex) {
            console.warn(error.message);
        }
    }

    insertBase64Image(url) {
        const range = this.range;
        this.quill.insertEmbed(range.index, 'imageBlot', `${url}`);
    }

    insertToEditor(url) {
        const range = this.range;
        // Delete the placeholder image
        this.quill.deleteText(range.index, 2);
        // Insert the server saved image
        this.quill.insertEmbed(range.index, 'image', `${url}`);
        
        range.index++;
        this.quill.setSelection(range, 'api');
    }
}

const MODULE_NAME = 'modules/imageUploader';
if (!Quill.imports.hasOwnProperty(MODULE_NAME)) {
    Quill.register(MODULE_NAME, ImageUploader);
}
