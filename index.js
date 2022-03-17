const core = require('@actions/core');

try {
  const files = core.getInput('files');
  const vars_string = core.getInput('replacements');
  const filenames = files
    .split(/[\n,;]+/)
    .map((filename) => filename.trim())
    .filter((filename) => filename.length > 0);
  const vars = vars_string
    .split(/[\n,;]+/)
    .map((varDefinition) => varDefinition.trim())
    .filter((varDefinition) => varDefinition.length > 0);
  console.log('files l:'+ filenames.length)
  for(var fi = 0; fi < filenames.length; fi++)
  {
    var filename = filenames[fi]
    var fs = require('fs')
    console.log('file1: '+ fi + ' '+filename)
    fs.readFile(filename, 'utf8', function (err,data) {
      if (err) {
        console.log(err);
      } else {
        var result = data
        console.log(data)
        for(var i = 0; i < vars.length; i++)
        {
          var pos_eq = vars[i].indexOf('=')
          var key = vars[i].substr(0, pos_eq)
          var value = vars[i].substr(pos_eq+1)
          result = result.replace(key, value)
        }
        fs.writeFile(filename, result, 'utf8', function (err) {
          if (err) 
            console.log(err)
          else 
            console.log(result)
        });
      }
    });
  }
} catch (error) {
  core.setFailed(error.message);
}
