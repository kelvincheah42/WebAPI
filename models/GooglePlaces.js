const Moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var GooglesPlaces = sequelize.define('GooglesPlaces', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
    centralLatitude: DataTypes.STRING,
    centralLongitude: DataTypes.STRING
  });

  return GooglesPlaces;
};