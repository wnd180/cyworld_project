const Sequelize = require("sequelize");

//user 테이블 스키마
class User extends Sequelize.Model {
  static init(sequelize) {
    const userAttr = {
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: "local",
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    };

    const userTbl = {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: "User",
      tableName: "users",
      paranoid: true,
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    };

    return super.init(userAttr, userTbl);
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    // db.User.belongsToMany(db.User, {
    //   foreignKey: 'followingId',
    //   as: 'Followers',
    //   through: 'Follow',
    // });
    // db.User.belongsToMany(db.User, {
    //   foreignKey: 'followerId',
    //   as: 'Followings',
    //   through: 'Follow',
    // });
  }
}

module.exports = User;
