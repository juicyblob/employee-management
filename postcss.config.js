import autoprefixer from 'autoprefixer'

const config = {
  plugins: [
    autoprefixer({
      overrideBrowserslist: [
        '> 0.5%',
        'last 2 versions',
        'not dead'
      ]
    })
  ]
}

export default config