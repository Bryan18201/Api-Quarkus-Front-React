package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;

@Entity
public class Producto extends PanacheEntity {
    public String nombre;
    public Double precio;

}
