package com.multivendor.ecommerce.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="vendors")
public class Vendor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	    @OneToOne
	    @JoinColumn(name = "user_id", nullable = false ,unique = true)
	    private User user;

	    @Column(nullable = false)
	    private String shopName;

	    @Column(nullable = false)
	    private boolean approved = false;
	    

	   

	    @CreationTimestamp
	    @Column(name = "created_at", updatable = false)
	    private LocalDateTime createdAt;


	    public Long getId() {
	        return id;
	    }

	    public User getUser() {
	        return user;
	    }

	    public void setUser(User user) {
	        this.user = user;
	    }

	    public String getShopName() {
	        return shopName;
	    }

	    public void setShopName(String shopName) {
	        this.shopName = shopName;
	    }

	    public boolean isApproved() {
	        return approved;
	    }

	    public void setApproved(boolean approved) {
	        this.approved = approved;
	    }

	    public LocalDateTime getCreatedAt() {
	        return createdAt;
	    }

}
