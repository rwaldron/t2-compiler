module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodeunit: {
      tests: [
        'test/*.js'
      ]
    },
    jshint: {
      all: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: [
          'bin/**/*.js',
          'lib/**/*.js',
          'Gruntfile.js',
        ]
      },
      tests: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: [
          'test/**/*.js',
        ]
      }
    },
    jscs: {
      all: [
        'bin/**/*.js',
        'lib/**/*.js',
        'test/**/*.js',
        'Gruntfile.js',
      ],
      options: {
        config: '.jscsrc'
      }
    },
    jsbeautifier: {
      all: [
        'bin/**/*.js',
        'lib/**/*.js',
        'test/**/*.js',
        'Gruntfile.js',
      ],
      options: {
        js: {
          braceStyle: 'collapse',
          breakChainedMethods: false,
          e4x: false,
          evalCode: false,
          indentChar: ' ',
          indentLevel: 0,
          indentSize: 2,
          indentWithTabs: false,
          jslintHappy: false,
          keepArrayIndentation: false,
          keepFunctionIndentation: false,
          maxPreserveNewlines: 10,
          preserveNewlines: true,
          spaceBeforeConditional: true,
          spaceInParen: false,
          unescapeStrings: false,
          wrapLineLength: 0
        }
      }
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-jsbeautifier');


  // 'npm test' runs these tasks
  grunt.registerTask('test', ['jshint', 'jscs', 'jsbeautifier', 'nodeunit']);

  // Default task.
  grunt.registerTask('default', ['test']);


  // Support running a single test suite
  grunt.registerTask('nodeunit:only', 'Run a single test specified by a target; usage: "grunt nodeunit:only:<module-name>[.js]"', function(file) {
    if (file) {
      grunt.config('nodeunit.tests', [
        'test/' + file + '.js'
      ]);
    }

    grunt.task.run('nodeunit');
  });
};
