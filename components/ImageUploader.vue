<template>
    <div>
        <input type="file" accept=".jpeg,.jpg,image/jpeg" @change="uploadFile"/>
    </div>
</template>

<script>
import { unWrap } from '~/utils/fetch'

export default {
    methods: {
        async uploadFile(e) {
            console.log('uploadFile:', e)
            const file = e.target.files[0]
            if (!file) {
                return;
            }

            const fileName = file.name.split('.').slice(0, -1).join('.') + Date.now()
            const options = {
                timestamp: Date.now(),
                public_id: fileName,
            }

            const response = await unWrap(await fetch('/api/cloudinary/signature', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(options)
            }))

            const signature = response.json.signature;
            // console.log()
            console.log('uploadFile:', signature)
            const readData = (fileObj) => new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(fileObj);
            })

            const data = await readData(file)
            const asset = await this.$cloudinary.upload(data, {
                ...options,
                apiKey: this.$config.cloudinary.apiKey,
                signature,
            })
        }
    }
}
</script>
