module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('image', {
        path: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Image;
}