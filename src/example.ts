const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Plant = sequelize.define('Plant', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    humidity: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

const PlantGrowth = sequelize.define('PlantGrowth', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_plant: {
        type: DataTypes.INTEGER,
        references: {
            model: Plant,
            key: 'id'
        }
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

const GrowthStage = sequelize.define('GrowthStage', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_plantGrowth: {
        type: DataTypes.INTEGER,
        references: {
            model: PlantGrowth,
            key: 'id'
        }
    },
    stage_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descriptions: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Definir las relaciones con 'CASCADE'
User.hasMany(Plant, { foreignKey: 'id_user', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Plant.belongsTo(User, { foreignKey: 'id_user' });

Plant.hasMany(PlantGrowth, { foreignKey: 'id_plant', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
PlantGrowth.belongsTo(Plant, { foreignKey: 'id_plant' });

PlantGrowth.hasMany(GrowthStage, { foreignKey: 'id_plantGrowth', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
GrowthStage.belongsTo(PlantGrowth, { foreignKey: 'id_plantGrowth' });

sequelize.sync({ force: true }).then(() => {
    console.log("Database & tables created!");
});


/*
{
    tem: data,
    hum: data,
    devices:{
        fan: bool,
        light: bool,
        bomba: bool,
        leds {
            visible: bool,
            UV: bool,
            IF: bool
        }    
    }
}

temperatura y humedad: sensor/Tem-Hum
ventilador: sensor/Fan
light: sensor/LightSensor
bomba: sensor/bomba
leds: sensor/leds

*/
