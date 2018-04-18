/**
 * Pagination V0.1
 * by:salen
 */

class Pagination {
  constructor() {
    this.nowNum = 1
    this.visibleNum = 7
  }

  init (el,data,params,url,render,type,reqType) {
    this.nowNum = 1
    this.data = data
    this.params = params
    this.url = url
    this.allNum = this.data.pages
    this.renderTable = render
    this.type = type
    this.reqType = reqType
    this.el = $(el)
    this.el.html( this.render() )
    this.el.unbind()
    this.event()
  }

  render () {
    if(this.allNum <= 1) return ''
    let pagesStr = '<div class="ui pagination menu pages">'
    pagesStr += this.nowNum <= 1 ? `<a class="icon item page" data-num=1>首页</a>` :
    `<a class="icon item page" data-num=1>首页</a>
     <a class="icon item page" data-num=${this.nowNum - 1}>上一页</a>`

    if(this.allNum <= this.visibleNum){
			for(let i=1; i<=this.allNum; i++){
				pagesStr += i === this.nowNum ? `<a class="item page page-num active" data-num=${i}>${i}</a>` :
        `<a class="item page page-num" data-num=${i}>${i}</a>`
			}
		}else{
			for(let i=1; i<=this.visibleNum; i++){
				if(this.nowNum <= Math.floor(this.visibleNum/2) ){
					pagesStr += i === this.nowNum ? `<a class="item page page-num active" data-num=${i}>${i}</a>` :
          `<a class="item page page-num" data-num=${i}>${i}</a>`						
				}
				else if( (this.allNum - this.nowNum) <= Math.floor(this.visibleNum/2) ){
          pagesStr += i === (this.visibleNum - (this.allNum - this.nowNum)) ? `<a class="item page page-num active" 
          data-num=${this.allNum - this.visibleNum + i}>${this.allNum - this.visibleNum + i}</a>` :
          `<a class="item page page-num" 
          data-num=${this.allNum - this.visibleNum + i}>${this.allNum - this.visibleNum + i}</a>`				
        }
        else{
          pagesStr += i === Math.ceil(this.visibleNum/2) ? `<a class="item page page-num active" 
          data-num=${this.nowNum - Math.ceil(this.visibleNum/2) + i}>${this.nowNum - Math.ceil(this.visibleNum/2) + i}</a>` :
          `<a class="item page page-num" 
          data-num=${this.nowNum - Math.ceil(this.visibleNum/2) + i}>${this.nowNum - Math.ceil(this.visibleNum/2) + i}</a>`
				}
			}				
		}

    pagesStr += this.nowNum == this.allNum ? `<a class="icon item page" data-num=${this.allNum}>尾页</a></div>` :
    `<a class="icon item page" data-num=${this.nowNum + 1}>下一页</a>
    <a class="icon item page" data-num=${this.allNum}>尾页</a></div>`

    pagesStr += `<div class="ui pagination menu alignItem">
                  <a class="icon item">跳转到</a>
                  <input type="text" class="width70px height30px item jump-to" name="" data-pages=${this.allNum}>
                  <a class="icon item">页</a>
                </div>`

    return pagesStr
  }

  gotoPage () {
    if( this.nowNum === this.params.currPage ){
      return
    }

    Object.assign( this.params, {currPage: this.nowNum} )
    this.reqType === 'json' ? 
    LXHR.POST(this.url, JSON.stringify(this.params), {contentType: 'application/json'}).done( res => {
      if(res.status === 200){
        this.el.html( this.render() )
        this.type ? this.renderTable(res.data[0].result.list, this.nowNum) : this.renderTable(res.data[0].list, this.nowNum)
      }else{
        LALERT.msg(res.message)
      }
    })
    :
    LXHR.POST(this.url, this.params).done( res => {
      if(res.status === 200){
        this.el.html( this.render() )
        this.type ? this.renderTable(res.data[0].result.list, this.nowNum) : this.renderTable(res.data[0].list, this.nowNum)
      }else{
        LALERT.msg(res.message)
      }
    })
  }  

  jumpto () {
    let n = this.el.find('.jump-to').val()*1
    let sum = this.el.find('.jump-to').data('pages')
    if(typeof n === 'number' && n > 0 && n <= sum && n === n && n%1 === 0){
      this.nowNum = n
      this.gotoPage()
    }else{
      LALERT.msg('请输入正确的页数')
    }
  }
  
  event () {
    let This = this
    this.el.on('click', '.item.page', function(evt) {
      This.nowNum = $(evt.target).data('num')*1
      This.gotoPage()
    })

    this.el.on('keyup', '.jump-to', function(evt) {
      if (evt.keyCode === 13) {
        This.jumpto()
      }
    })
  }
}