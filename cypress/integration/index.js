const commandLineArgs = require('command-line-args')
const fse = require('fs-extra')
const { readdirSync } = require('fs')
const path = require('path')
const cypress = require('cypress')
const { merge } = require('mochawesome-merge')
const generator = require('mochawesome-report-generator')

function getOptions () {
  const optionDefinitions = [
    { name: 'integration', alias: 'i', type: String, defaultOption: true },
  ]

  return commandLineArgs(optionDefinitions)
}

function getSpecPath (integration) {
  const getDirectories = source => readdirSync(source, { withFileTypes: true }).
    filter(dirent => dirent.isDirectory()).
    map(dirent => dirent.name)

  const testSuites = getDirectories(__dirname)

  if (!integration) {
    //Se ejecutan todos los tests
    return path.join(__dirname, '**', '**.spec.js')
  } else if (testSuites.includes(integration)) {
    //Se ejecutan solo los tests para una integracion
    return path.join(__dirname, integration, '**', '**.spec.js')
  } else {
    throw `Test suite incorrecto, estos son los valores disponibles: ${testSuites.join(
      ', ')}`
  }
}

async function runTests (spec) {
   console.log(`running tests at ${spec}`)
   await fse.remove('results')
   await fse.remove('report')
  const { totalFailed } = await cypress.run({
    //TODO: definir el baseUrl dependendiendo del ambiente en el que se ejecute
    config: { baseUrl: 'http://www.ebay.com'},
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'results',
      overwrite: false,
      html: false,
      json: true,
    },
    spec: spec,
  })

  const jsonReport = await merge({ reportDir: 'results' })

  await generator.create(jsonReport,
    {
      reportDir: 'report',
      reportFilename: 'report',
      timestamp: 'dd-mm-yyyy_HH-MM-ss',
      reportTitle: 'Test ebay',
    })
  process.exit(totalFailed)

}

const { integration } = getOptions()

return runTests(getSpecPath(integration))


