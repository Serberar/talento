const { MigrationInterface, QueryRunner } = require("typeorm");
const { Logger } = require('@nestjs/common');
const fs = require('fs');
const path = require('path');

class InitialWorksData1709140841155 {
    async up(queryRunner) {
        const logger = new Logger();

        // crea la tabla en caso de que no exista
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS works (
                id INT AUTO_INCREMENT PRIMARY KEY,
                description VARCHAR(255),
                name VARCHAR(255),
                price1 DECIMAL,
                price2 DECIMAL,
                price3 DECIMAL,
                price4 DECIMAL,
                priceGapMod DECIMAL,
                section_description VARCHAR(255),
                section_name VARCHAR(255),
                section_vehicle VARCHAR(255)
            )
        `);

        // ruta al archivo seed
        const filePath = path.join(__dirname, 'initialWorks.json');

        try {
            // mapea los datos y los inserta en la base 
            const jsonData = fs.readFileSync(filePath, 'utf-8');
            const data = JSON.parse(jsonData);

            const values = data.map(entry => `(
                '${entry.description}', 
                '${entry.name}', 
                ${entry.price1}, 
                ${entry.price2}, 
                ${entry.price3}, 
                ${entry.price4}, 
                ${entry.priceGapMod}, 
                '${entry.section.description}', 
                '${entry.section.name}', 
                '${entry.section.vehicle}')`
            ).join(', ');

            await queryRunner.query(`
                INSERT INTO works (description, name, price1, price2, price3, price4, priceGapMod, section_description, section_name, section_vehicle)
                VALUES ${values};
            `);
            logger.log("Datos insertados correctamente en la base de datos.");
        } catch (error) {
            logger.error("Error al cargar los datos iniciales:", error);
        }
    }

    async down(queryRunner) {
        const logger = new Logger();

        // verifica si hay trabajos asociados a alguna sección
        const hasworks = await queryRunner.query(`
            SELECT COUNT(*) AS count FROM works WHERE section_name IN (
                SELECT DISTINCT section_name FROM works
            )
        `);

        const worksCount = hasworks[0].count;

        if (worksCount > 0) {
            logger.warn("Hay trabajos asociados a secciones. No se puede revertir la migración.");
            return;
        }

        // si no hay trabajos asociados, elimina todos los registros y la tabla works
        await queryRunner.query(`DELETE FROM works`);
        await queryRunner.query(`DROP TABLE IF EXISTS works`);

        logger.log("Datos iniciales revertidos correctamente.");
    }
}

module.exports = InitialWorksData1709140841155;
