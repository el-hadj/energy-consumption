package com.pds.ing2.backendpds2.repository;

import com.pds.ing2.backendpds2.model.Users;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface UsersRepo extends CrudRepository<Users, Integer> {

    @Query(nativeQuery = true)
    Integer checkEmail(@Param("email") String email);

    @Query(nativeQuery = true)
    Users selectUser(@Param("email") String email);

    @Query(nativeQuery = true)
    Users selectUserWithId(@Param("id") Integer id);

    @Query(nativeQuery = true)
    List<Map<String, String>> selectUsersWithFirstNameOrLastName(@Param("value") String value,
            @Param("id_company") Integer id_company);
}
