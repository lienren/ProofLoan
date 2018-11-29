import api from '../../../api/index' // eslint-disable-line
import Base from '../../base/index'
import uploadModule from '../../../plugs/upload'

export default class extends Base {
  // constructor (vm) {
  //   super(vm)
  // }
  upload (data, e) {
    return new Promise(resolve => {
      uploadModule.load({
        ...data,
        onSuccess: (data) => {
          resolve(data)
        }
      }, e)
    })
  }

  async uploadImg (e) {
    const { images, formData } = await this.upload({ number: 3 }, e)
    this.vm.imgList = images
    const res = await api.UploadImgs(formData, {
      type: 'image',
      loadMsg: '上传中...'
    })
    if (res) {
      console.log('res:', res)
    }
  }

  async uploadVideo (e) {
    const { fileURL, formData } = await this.upload({
      type: 'video',
      videoSize: 22
    }, e)
    this.vm.video = fileURL
    const res = await api.H5FaceUploadVideo(formData, {
      loadMsg: '上传中...'
    })
    if (res) {
    }
  }
}
