import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1662414293585 implements MigrationInterface {
    name = 'migration1662414293585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "favorite" (
                "id" character varying NOT NULL,
                "accountId" uuid NOT NULL,
                "title" character varying NOT NULL,
                "channel" character varying NOT NULL,
                "channelId" character varying NOT NULL,
                "saveDate" date NOT NULL DEFAULT now(),
                CONSTRAINT "PK_f4d68d39b7658f13c0b6da17595" PRIMARY KEY ("id", "accountId")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "account" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "createDate" date NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_41dfcb70af895ddf9a53094515b" UNIQUE ("username"),
                CONSTRAINT "UQ_4c8f96ccf523e9a3faefd5bdd4c" UNIQUE ("email"),
                CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite"
            ADD CONSTRAINT "FK_5dedf4cf7a911c8f0445465aec9" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "favorite" DROP CONSTRAINT "FK_5dedf4cf7a911c8f0445465aec9"
        `);
        await queryRunner.query(`
            DROP TABLE "account"
        `);
        await queryRunner.query(`
            DROP TABLE "favorite"
        `);
    }

}
