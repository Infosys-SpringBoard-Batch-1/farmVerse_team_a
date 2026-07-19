package com.farmverse.backend.repository;
import com.farmverse.backend.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {
    Optional<Crop> findByIdAndFarm_Farmer_Id(Long cropId, Long farmerId);
    long countByFarm_Farmer_Id(Long farmerId);
}


/*
notes
findByFarmerId: allows 'List all farms', returns farms belonging to the logged in farmer
findByIdAndFarmerId: allows view/edit/delete farm ownership check, fetch farms iff it belongs to that farmer.
findByIdAndFarm_Farmer_Id: ownership check for crop, (Crop to Farm to User), it has underscore Spring data JPA parses this automatically into correct join query. no manual SQL needed.
 */