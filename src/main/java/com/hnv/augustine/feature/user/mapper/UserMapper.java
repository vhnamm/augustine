package com.hnv.augustine.feature.user.mapper;

import com.hnv.augustine.feature.auth.dto.RegisterRequest;
import com.hnv.augustine.feature.auth.dto.RegisterResponse;
import com.hnv.augustine.feature.user.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(RegisterRequest registerRequest);
    RegisterResponse toRegisterResponse(User user);

}
