<?php
// =============================================
// Traitement du formulaire de contact
// Art et Confort - Hostinger
// =============================================

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /pages/contact.html');
    exit;
}

// Anti-spam honeypot
if (!empty($_POST['website'])) {
    if (!empty($_SERVER['HTTP_X_REQUESTED_WITH'])) {
        header('Content-Type: application/json');
        echo json_encode(['success' => true]);
    } else {
        header('Location: /pages/contact.html?status=success');
    }
    exit;
}

$isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';

// Destinataires
$to = 'watrelot.francois@free.fr, orvcremi@gmail.com';

// Recuperation et nettoyage des donnees
$nom = htmlspecialchars(strip_tags(trim($_POST['nom'] ?? '')));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$telephone = htmlspecialchars(strip_tags(trim($_POST['telephone'] ?? '')));
$ville = htmlspecialchars(strip_tags(trim($_POST['ville'] ?? '')));
$sujet = htmlspecialchars(strip_tags(trim($_POST['sujet'] ?? '')));
$message = htmlspecialchars(strip_tags(trim($_POST['message'] ?? '')));

// Validation
if (empty($nom) || empty($email) || empty($telephone) || empty($sujet) || empty($message)) {
    if ($isAjax) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Veuillez remplir tous les champs obligatoires.']);
    } else {
        header('Location: /pages/contact.html?status=error&msg=champs');
    }
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    if ($isAjax) {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Adresse email invalide.']);
    } else {
        header('Location: /pages/contact.html?status=error&msg=email');
    }
    exit;
}

// Construction de l'email
$subject = "Art et Confort - Nouveau message : $sujet";

$body = "Nouveau message depuis le site Art et Confort\n";
$body .= "=============================================\n\n";
$body .= "Nom : $nom\n";
$body .= "Email : $email\n";
$body .= "Telephone : $telephone\n";
$body .= "Ville : $ville\n";
$body .= "Sujet : $sujet\n\n";
$body .= "Message :\n$message\n";

$headers = "From: noreply@art-et-confort.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Envoi
$sent = mail($to, $subject, $body, $headers);

if ($isAjax) {
    header('Content-Type: application/json');
    if ($sent) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Erreur lors de l\'envoi. Veuillez nous appeler au 06 88 80 32 29.']);
    }
} else {
    if ($sent) {
        header('Location: /pages/contact.html?status=success');
    } else {
        header('Location: /pages/contact.html?status=error&msg=envoi');
    }
}
exit;
