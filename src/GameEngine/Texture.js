/**
 * Actually just a PIXI texture.
 * @class
 */
spnr.GameEngine.Texture = {};

/**
 * Load a texture from a URL
 * @param {string} url 
 * @returns {spnr.GameEngine.Texture}
 * @static
 */
spnr.GameEngine.Texture.fromUrl = function(url) {
    return PIXI.Texture.from(url);
}