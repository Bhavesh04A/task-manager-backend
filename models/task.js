module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.TEXT,
        status: {
            type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
            allowNull: false,
            defaultValue: 'To Do'
        },
        priority: {
            type: DataTypes.ENUM('Low', 'Medium', 'High'),
            allowNull: false,
            defaultValue: 'Medium'
        },
        dueDate: DataTypes.DATE,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: true
    });

    Task.associate = (models) => {
        Task.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    };

    return Task;
};