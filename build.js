const esbuild = require('esbuild')
const path = require('path')

const build = async () => {
  const service = await esbuild.startService()
  const distDir = path.resolve(__dirname, 'dist')

  try {
    await service.build({
      entryPoints: ['./src/index.jsx'],
      bundle: true,
      format: 'esm',
      platform: 'browser',
      external: ['react', 'react-dom', 'formik'],
      outdir: path.resolve(distDir, 'esm')
    })

    await service.build({
      entryPoints: ['./src/index.jsx'],
      bundle: true,
      format: 'cjs',
      platform: 'node',
      external: ['react', 'react-dom', 'formik'],
      outdir: path.resolve(distDir, 'cjs')
    })
  } catch (e) {
    console.log(e);
  } finally {
    service.stop()
  }

}

build()
