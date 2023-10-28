import 'package:url_launcher/url_launcher.dart';

Future<void> followLink(String url) {
  return launchUrl(Uri.parse(url), mode: LaunchMode.externalApplication);
}
