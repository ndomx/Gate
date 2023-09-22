class LoginResponseDto {
  final String token;

  const LoginResponseDto({required this.token});

  factory LoginResponseDto.fromJson(Map<String, dynamic> json) {
    return LoginResponseDto(token: json['accessToken']);
  }

  Map<String, dynamic> toJson() {
    return {'accessToken': token};
  }
}
