import JSZip from 'jszip'
import { RawSource } from 'webpack-sources'

const zip = new JSZip()

export default class AllZipPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('AllZipPlugin', (compilation, callback) => {
      const {
        filename = 'assets',
        fileOptions = {},
        generateOptions = { type: 'nodeBuffer' },
      } = (this.options || {})

      const folder = zip.folder(filename)

      for (const file in compilation.assets) {
        const source = compilation.assets[file].source()
        folder.file(file, source, fileOptions)
      }

      zip.generateAsync(generateOptions).then((content) => {
        const name = filename + '.zip'
        compilation.assets[name] = new RawSource(content)
        callback()
      })
    })
  }
}
