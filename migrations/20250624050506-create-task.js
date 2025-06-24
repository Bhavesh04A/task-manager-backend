'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Tasks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: Sequelize.TEXT,
            status: {
                type: Sequelize.ENUM('To Do', 'In Progress', 'Done'),
                allowNull: false,
                defaultValue: 'To Do'
            },
            priority: {
                type: Sequelize.ENUM('Low', 'Medium', 'High'),
                allowNull: false,
                defaultValue: 'Medium'
            },
            dueDate: Sequelize.DATE,
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Tasks');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Tasks_status";');
        await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Tasks_priority";');
    }
};