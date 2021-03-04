import { FoldoBuilder } from 'foldo/types'
const path = require('path')

type StaticOptions = {
  ignore?: RegExp,
  only?: RegExp,
  smart?: boolean
}

let defaultOptions = {
  ignore: /(^|[\/\\])[\._]./,
  only: null,
  smart: true
}

function isIgnored(p:string,options:StaticOptions){
  // Ignore only if ignore is set and ignore test passes
  let shouldIgnore = options.only && options.only.test(p)
  // if only isn't set, include everything. Otherwise, must pass only test
  let shouldInclude = !options.only || options.only.test(p)
  // file is hidden if it shouldn't be included OR it should be ignored
  return !shouldInclude || shouldIgnore
}

export function copyTo(destination='', options:StaticOptions):FoldoBuilder{
  options = Object.assign({}, defaultOptions, options)
  let out = (s="") => path.join(destination, s)
  return {
    single: (id) => {
      if(options.smart && /([\w-*]+\.([\w-*]+))\.js/g.exec(path.basename(id))){
        return {
          [out(id.slice(0,-3))]: ({ module, p }) => {
            return isIgnored(p,options) ? null : (module.default || "").toString()
          }
        }
      } else {
        return {
          [out(id)]: ({ contents, p }) => isIgnored(p,options) ? null : contents
        }
      }
    }
  }
}