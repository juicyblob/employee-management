import autoprefixer from 'autoprefixer'

const config = {
  plugins: [
    autoprefixer({
      // Опции autoprefixer (опционально)
      overrideBrowserslist: [
        '> 0.5%',
        'last 2 versions',
        'not dead'
      ]
    })
  ]
}

export default config