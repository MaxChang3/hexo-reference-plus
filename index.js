const htmlReplacer = require('./src/htmlReplacer');
const referParser = require('./src/referParser');

hexo.extend.tag.register('references', function (args, content) {
    let reference = referParser(content)
    return `<ul id='refplus'>${reference.join('')}</ul>`;
}, { ends: true });

hexo.extend.tag.register('ref', function (args) {
    args = args.map(arg => `<sup class='refplus-num'><a href="#ref-${arg}">[${arg}]</a></sup>`)
    return args.join('');
});

hexo.extend.filter.register('after_post_render', (data) => {
    if (!(data.refplus)) return data;
    data.content = htmlReplacer(data.content);
    data.content += `
    <style>
    #refplus, #refplus li{ 
        padding:0;
        margin:0;
        list-style:none;
    }
    </style>
    `
    return data
});