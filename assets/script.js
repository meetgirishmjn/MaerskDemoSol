

$(document).ready(function () {

    const tilesData = [
        { text: '1' },
        { text: '2' },
        { text: '3' },
        { text: '4' },
        { text: '5' },
        { text: '6' },
        { text: '7' },
        { text: '8' },
        { text: '9' },
    ];

    randomizeArray = (array) => {
        let clonedArray = [...array];
        clonedArray.sort(() => Math.random() - 0.5);
        return clonedArray;
    }

    splitArray = (array, size) => {
        let results = [];
        let clonedArray = [...array];
        while (clonedArray.length) {
            results.push(clonedArray.splice(0, size));
        }
        return results;
    }

    createTemplateFrom = (obj) => {
        let template = $("#tile-template").html();

        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        }

        function replaceAll(str, find, replace) {
            return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        }

        Object.keys(obj).forEach((key) => {
            template = replaceAll(template, '${' + key + '}',obj[key]);
        });

        return template;
    }

    renderTiles = (data, isRandom=true) => {
        
        if (isRandom) {
            data = randomizeArray(data);
        }

        //set order
        data.forEach((item, index) => {
            item.order = item.text;
        });

        let divWidget = $("div.widgets");
        divWidget.empty();

        const tileRows = splitArray(data, 3);

        tileRows.forEach((tiles, rowIndex) => {
            divWidget.append('<div class="d-flex flex-sm-row flex-column"></div>');
            let divRow = divWidget.find('div.d-flex:last');
            //tiles in row
            tiles.forEach((tile, colIndex) => {
                let tileHtml = createTemplateFrom(tile);
                $(tileHtml).appendTo(divRow);
            });
        });
    }

    $('#btnShuffle').click(() => {
        renderTiles(tilesData);
    });

    $('#btnSort').click(() => {
        renderTiles(tilesData,false);
    });

    renderTiles(tilesData);
});