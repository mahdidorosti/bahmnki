'use strict';

Bahmni.Common.Util.DateTimeFormatter = {

    getDateWithoutTime: function (datetime) {
        return datetime ? moment(datetime).locale('en').format("YYYY-MM-DD") : null;
    }
};
