'use strict'

var yo = require('yo-yo')
var css = require('./universal-dapp-styles')

class MultiParamManager {

  /**
    *
    * @param {bool} lookupOnly
    * @param {Object} funABI
    * @param {Function} clickMultiCallBack
    *
    */
  constructor (lookupOnly, funABI, clickCallBack) {
    this.lookupOnly = lookupOnly
    this.funABI = funABI
    this.clickCallBack = clickCallBack
  }

  switchMethodViewOn () {
    this.contractActionsContainerSingle.style.display = 'none'
    this.contractActionsContainerMulti.style.display = 'flex'
  }

  switchMethodViewOff () {
    this.contractActionsContainerSingle.style.display = 'flex'
    this.contractActionsContainerMulti.style.display = 'none'
  }

  createMultiFields () {
    if (this.funABI.inputs) {
      return yo`<div>
        ${this.funABI.inputs.map(function (inp) {
          return yo`<div class="${css.multiArg}"><label for="${inp.name}"> ${inp.name}: </label><input placeholder="${inp.type}" id="${inp.name}" title="${inp.name}"></div>`
        })}
      </div>`
    }
  }

  render () {
    var title
    if (this.funABI.name) {
      title = this.funABI.name
    } else {
      title = '(fallback)'
    }

    var basicInputField = yo`<input></input>`
    basicInputField.setAttribute('placeholder', getInputs)
    basicInputField.setAttribute('title', '')

    var onClick = () => {
      this.clickCallBack(this.funABI.inputs, basicInputField.value)
    }

    var getInputs = () => {
      var inputVars = ''
      this.funABI.inputs.map(function (inp) {
        if (!inputVars) {
          inputVars += inp.type
        } else {
          inputVars = ', ' + inp.type
        }
        return inputVars
      })
    }

    this.contractActionsContainerSingle = yo`<div class="${css.contractActionsContainerSingle}" >
      <i class="fa fa-caret-right ${css.methCaret}" onclick=${() => { this.switchMethodViewOn() }} title=${title} ></i>
      <button onclick=${() => { onClick() }} class="${css.instanceButton} ${css.call}">${title}</button>${basicInputField}
      </div>`

    var multiFields = this.createMultiFields()
    var multiOnClick = () => {
      var valArray = multiFields.querySelectorAll('input')
      var ret = ''
      for (var k = 0; k < valArray.length; k++) {
        var el = valArray[k]
        if (ret !== '') ret += ','
        ret += el.value
      }
      this.clickCallBack(this.funABI.inputs, ret)
    }

    var button = yo`<button onclick=${() => { multiOnClick() }} class="${css.instanceButton}">Submit</button>`

    this.contractActionsContainerMulti = yo`<div class="${css.contractActionsContainerMulti}" >
      <div class="${css.contractActionsContainerMultiInner}" >
        <div onclick=${() => { this.switchMethodViewOff() }} class="${css.multiHeader}">
          <i class='fa fa-caret-down ${css.methCaret}'></i>
          <div class="${css.multiTitle}">${title}</div>
        </div>
        ${multiFields}
        <div class="${css.group} ${css.multiArg}" >
          ${button}
        </div>
      </div>
    </div>`

    if (this.lookupOnly) {
      // contractProperty.classList.add(css.constant)
      // buttonMulti.setAttribute('title', (title + ' - call'))
    }

    if (this.funABI.inputs && this.funABI.inputs.length > 0) {
      // contractProperty.classList.add(css.hasArgs)
    }

    if (this.funABI.payable === true) {
      // contractProperty.classList.add(css.payable)
      // buttonMulti.setAttribute('title', (title + ' - transact (payable)'))
    }

    if (!this.lookupOnly && this.funABI.payable === false) {
      // buttonMulti.setAttribute('title', (title + ' - transact (not payable)'))
    }

    return yo`<div class="${css.contractProperty}">${this.contractActionsContainerSingle} ${this.contractActionsContainerMulti}</div>`
  }
}

module.exports = MultiParamManager
