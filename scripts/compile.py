import json

PACKAGE_FILE = 'package.json'
INPUT_FILES = [
    'src/core.js',
    'src/misc.js',
    'src/str.js',
    'src/math.js',
    'src/dom.js',
    'src/arr.js',
    'src/obj.js',
    'src/vector.js',
    'src/attitude.js',

    'src/Sound.js',
    'src/KeyWatcher.js',
    'src/MouseWatcher.js',
    'src/FunctionGroup.js',

    'src/machineLearning/NeuralNetwork.js',
    'src/machineLearning/Neuron.js',

    'src/GameEngine/GameEngine.js',
    'src/GameEngine/Entity.js',
    'src/GameEngine/Scene.js',
    'src/GameEngine/Texture.js',
    'src/GameEngine/DrawableEntity.js',
    'src/GameEngine/Label.js',
    'src/GameEngine/Button.js',
    'src/GameEngine/BaseCollider.js',
    'src/GameEngine/CircleCollider.js',
    'src/GameEngine/Particle.js',
    'src/GameEngine/ParticleEffect.js',
    'src/GameEngine/FrameRateDisplay.js',
    'src/GameEngine/canvasSizers/AbstractCanvasSizer.js',
    'src/GameEngine/canvasSizers/FixedARCanvasSizer.js',
    'src/GameEngine/canvasSizers/FillPageCanvasSizer.js',
]
LICENSE = 'src/_license.js'

JS_HEADER = 'src/_header.js'
MJS_HEADER = 'src/_header.mjs'

JS_FOOTER = 'src/_footer.js'
MJS_FOOTER = 'src/_footer.mjs'

OUTPUT_JS_FILE = 'build/spnr.js'
OUTPUT_MJS_FILE = 'build/spnr.mjs'

# file read/write stuff
def write_file(file_path, contents):
    file = open(file_path, 'w+', encoding='utf-8')
    file.write(str(contents))
    file.close()

def read_file(file_path):
    file = open(file_path, 'r', encoding='utf-8')
    contents = file.read()
    file.close()
    return contents

def compile_spnr(input_files, output_file):
    # output = 
    output = '\n\n'.join([read_file(path) for path in input_files])
    output = output.replace('$$spnr-version$$', version)
    write_file(output_file, output)

if __name__ == '__main__':
    version = json.loads(read_file(PACKAGE_FILE))['version']
    compile_spnr([LICENSE, JS_HEADER, *INPUT_FILES, JS_FOOTER], OUTPUT_JS_FILE)
    compile_spnr([LICENSE, MJS_HEADER, *INPUT_FILES, MJS_FOOTER], OUTPUT_MJS_FILE)