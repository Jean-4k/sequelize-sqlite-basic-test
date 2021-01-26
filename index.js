const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize('sqlite::memory');

class User extends Model {}
User.init({
    username: DataTypes.STRING,
    birthday: DataTypes.DATE
}, {
    sequelize,
    modelName: 'user'
});

(async () => {
    try {
	await sequelize.authenticate();
	console.log('Authentication successful.');
	await sequelize.sync();
	const jean = await User.create({
	    username: 'Jean',
	    birthday: new Date(2021, 26, 01)
	});
	console.log(jean.toJSON());
	let jean2 = (await User.findOne({
	    where: {
		username: 'Jean'
	    }
	})).dataValues;
	if(!jean2)
	    console.error('User not found.');
	else
	    console.log(jean.id === jean2.id);
    } catch(error) {
	console.error('Authentication failed:', error);
    }
    
    sequelize.close();
})();
