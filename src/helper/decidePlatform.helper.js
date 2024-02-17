module.exports = function decidePlatform() {
    const platform = process.platform
    console.log(platform)

    if (platform === 'win32') {
        return '\\'
    } else {
        return '/'
    }
}