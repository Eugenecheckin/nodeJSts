`./src/models/user-model.ts`
import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface UserAttributes {
    id: number;
    fullName: string;    
    email: string;
    password: string;
    dob: Date;
    createdAt?: Date;
    updatedAt?: Date;
    isAdmin: boolean;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory (sequelize: Sequelize): UserStatic {
    return <UserStatic>sequelize.define("users", {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },        
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            is: /^(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*\.\w{2,4})$/i
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        dob: {
          type: DataTypes.DATE,
          allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false
        },
    });
}