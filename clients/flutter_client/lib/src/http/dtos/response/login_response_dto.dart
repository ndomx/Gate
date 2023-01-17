class LoginResponseDto {
  final String token;

  const LoginResponseDto({required this.token});

  factory LoginResponseDto.fromJson(Map<String, dynamic> json) {
    return LoginResponseDto(token: json['access_token']);
  }

  Map<String, dynamic> toJson() {
    return {'access_token': token};
  }
}
