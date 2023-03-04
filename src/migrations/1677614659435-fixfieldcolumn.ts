import { MigrationInterface, QueryRunner } from "typeorm";

export class fixfieldcolumn1677614659435 implements MigrationInterface {
    name = 'fixfieldcolumn1677614659435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "description" character varying NOT NULL`);
    }

}
