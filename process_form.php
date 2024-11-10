<?php
ini_set('display_errors', 'Off');
error_reporting(E_ALL);

header('Content-Type: application/json');

$host = 'localhost'; 
$db = 'clients_database'; 
$user = 'root'; 
$pass = ''; 

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Ошибка подключения к базе данных.']);
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = isset($_POST['first-name']) ? trim($_POST['first-name']) : '';
    $lastName = isset($_POST['last-name']) ? trim($_POST['last-name']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $field1 = isset($_POST['field1']) ? trim($_POST['field1']) : '';
    $field2 = isset($_POST['field2']) ? trim($_POST['field2']) : '';

    if (empty($firstName) || empty($lastName) || empty($phone) || empty($email)) {
    // if (empty($firstName) || empty($lastName) || empty($phone) || empty($email)) {
    //     echo json_encode(['success' => false, 'message' => 'Пожалуйста, заполните все обязательные поля.']);
    //     exit();
    }

    $firstName = $conn->real_escape_string($firstName);
    $lastName = $conn->real_escape_string($lastName);
    $phone = $conn->real_escape_string($phone);
    $email = $conn->real_escape_string($email);
    $field1 = $conn->real_escape_string($field1);
    $field2 = $conn->real_escape_string($field2);

    $stmt = $conn->prepare("INSERT INTO feedback (first_name, last_name, phone, email, idea_description, tattoo_location) VALUES (?, ?, ?, ?, ?, ?)");
    if ($stmt === false) {
        echo json_encode(['success' => false, 'message' => 'Ошибка подготовки запроса: ' . $conn->error]);
        exit();
    }
    $stmt->bind_param("ssssss", $firstName, $lastName, $phone, $email, $field1, $field2);
    if ($stmt->execute()) {
      
        echo json_encode(['success' => true]);
        exit();
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка при сохранении данных в базе данных: ' . $stmt->error]);
        exit();
    }
    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Неверный метод запроса.']);
    exit();
}
