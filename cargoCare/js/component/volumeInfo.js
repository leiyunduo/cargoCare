/**
 * VolumeInfo V0.1
 * by:salen
 */

class VolumeInfo {
  constructor() {
    this.volumeList = []
    this.isAdd = true
    this.isInit = false
  }

  init(el) {
    if(this.isInit){
      return
    }
    this.isInit = true
    this.el = $(el)
    this.change()
    this.event()
  }

  change(volumeList=[]) {
    this.volumeList = volumeList
    this.index = 0
    this.sumVolume = 0
    this.sumVolumeWeight = 0
    this.sumPiece = 0
    this.nowEdit = null
    this.nowData = null
    this.countSumVolume()
    this.render()
  }

  render() {
    let str = this.volumeList.map((item, index) => `
      <tr class="info-item">
        <td>${index + 1}</td>
        <td><input type="text" class="ipt volume_length" value="${item.length}"></td>
        <td><input type="text" class="ipt volume_width" value="${item.width}"></td>
        <td><input type="text" class="ipt volume_height" value="${item.height}"></td>
        <td><input type="text" class="ipt volume_piece" value="${item.quantity}"></td>
        <td class="volume_size">${item.volume.toFixed(3)}</td>
        <td class="volume_weight">${item.volume_weight.toFixed(2)}</td>
        <td>
          <button class="ui medium red button deleteVolumeInfo" data-index=${index}>删除</button>
        </td>
      </tr>`
    ).join('')
    str += `
            <tr class="insertVolumeInfo">
              <td>输入</td>
              <td><input type="text" class="ipt volume_length"></td>
              <td><input type="text" class="ipt volume_width"></td>
              <td><input type="text" class="ipt volume_height"></td>
              <td><input type="text" class="ipt volume_piece"></td>
              <td class="volume_size"></td>
              <td class="volume_weight"></td>
              <td>
                <button class="ui medium red button">删除</button>
              </td>
            </tr>
            <tr class="volume_sum">
              <td>合计</td>
              <td></td>
              <td></td>
              <td></td>
              <td class="sumPiece">${this.sumPiece}</td>
              <td class="sumVolume">${this.sumVolume.toFixed(3)}</td>
              <td class="sumVolumeWeight">${this.sumVolumeWeight.toFixed(2)}</td>
              <td></td>
            </tr>`
    this.el.html(str)
    $('.insertVolumeInfo .volume_length').focus()
  }

  countVolume() {
    this.nowData = {
      length: this.nowEdit.find('.volume_length').val(),
      width: this.nowEdit.find('.volume_width').val(),
      height: this.nowEdit.find('.volume_height').val(),
      quantity: this.nowEdit.find('.volume_piece').val(),
      volume: '',
      volume_weight: '',
    }
    let {length:l, width:w, height:h, quantity:n} = this.nowData
    if(l && w && h && n){
      this.nowData.volume = Decimal.add(1).mul(l).mul(w).mul(h).mul(n).div(1000000).toNumber()
      this.nowData.volume_weight = Math.round(Decimal.add(1).mul(l).mul(w).mul(h).mul(n).div(6000).toNumber())
      this.nowEdit.find('.volume_size').html( this.nowData.volume )
      this.nowEdit.find('.volume_weight').html( this.nowData.volume_weight )
    }
  }

  countSumVolume() {
    this.sumVolume = this.volumeList.reduce((a, b) => {
      return Decimal.add([a, b.volume]).toNumber()
    }, 0)

    this.sumVolumeWeight = this.volumeList.reduce((a, b) => {
      return Decimal.add([a, b.volume_weight]).toNumber()
    }, 0)

    this.sumPiece = this.volumeList.reduce((a, b) => {
      return Decimal.add([a, b.quantity]).toNumber()
    }, 0)

    $('.detail_net_volume').val(this.sumVolume.toFixed(3))
    
    let sv = this.sumVolumeWeight*1
    let dw = $('.detail_net_weight').val() && $('.detail_net_weight').val()*1
    let w = Math.max(sv, dw).toFixed(2)
    $('.detail_weight').val(w)
  }

  insertVolume() {
    if(this.isAdd){
      this.volumeList.push(this.nowData)
      this.countSumVolume()
      this.render()
    }
  }

  deleteVolume() {
    this.volumeList.splice(this.index, 1)
    this.countSumVolume()
    this.render()
  }

  editVolume() {
    if(!this.isAdd){
      let nowIndex = this.nowEdit.index()
      this.volumeList[nowIndex] = this.nowData
      this.countSumVolume()
      this.render()
    }
  }

  event() {
    let This = this
    this.el.on('keyup', '.insertVolumeInfo .volume_piece', function (evt) {
      this.isAdd = true
      evt.keyCode === 13 && This.insertVolume()
    })

    this.el.on('click', '.info-item .deleteVolumeInfo', function (evt) {
      This.index = $(this).data('index')
      This.deleteVolume()
    })

    this.el.on('change', '.ipt', function (evt) {
      This.nowEdit = $(this).parent().parent()
      This.isAdd = This.nowEdit.hasClass('insertVolumeInfo') ? true : false
      This.countVolume()
      This.editVolume()
    })
  }
}