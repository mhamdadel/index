package com.mycompany.notepad;

import java.io.File;
import java.io.IOException;
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Menu;
import javafx.scene.control.MenuBar;
import javafx.scene.control.MenuItem;
import javafx.scene.control.SeparatorMenuItem;
import javafx.scene.control.TextArea;
import javafx.scene.layout.BorderPane;
import javafx.stage.DirectoryChooser;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

/**
 * JavaFX App
 */
public class App extends Application {

    String curFilePath = null;
    
    @Override
    public void start(Stage stage) {
        BorderPane root = new BorderPane();
        TextArea area = new TextArea();
        area.setStyle(
                "-fx-fill: black;"
                + "-fx-color: white;"
        );
        Scene scene = new Scene(root, 650, 650);
        DirectoryChooser directoryChooser = new DirectoryChooser();
        FileChooser newFileChooser = new FileChooser();


        MenuBar menubar = new MenuBar();
        Menu FileMenu = new Menu("File");
        MenuItem filemenu1 = new MenuItem("new");        
        filemenu1.setOnAction(e -> {
        directoryChooser.setInitialDirectory(new File("src"));
            File selectedNewFileChooser = newFileChooser.showSaveDialog(stage);
            try {
                File myObj = new File(selectedNewFileChooser.getPath());
                if (myObj.createNewFile()) {
                    FileManager.write(selectedNewFileChooser.getPath(), area.getText());
                  System.out.println("File created: " + myObj.getName());
                } else {
                  System.out.println("File already exists.");
                }
              } catch (IOException er) {
                System.out.println("An error occurred.");
                er.printStackTrace();
              }
        });
        
        MenuItem filemenu2 = new MenuItem("open..");
        filemenu2.setOnAction(e -> {
        FileChooser openFileChooser = new FileChooser();
            File selectedOpenFileChooser = openFileChooser.showOpenDialog(stage);
            curFilePath = selectedOpenFileChooser.getPath();
            String contentOfFile = FileManager.read(curFilePath);
            area.setText(contentOfFile);
        });
        
        MenuItem filemenu3 = new MenuItem("Save");
        filemenu3.setOnAction(e -> {
            FileManager.write(curFilePath, area.getText());
        });
        
        
        MenuItem filemenu4 = new MenuItem("Exit");
        FileMenu.getItems().addAll(filemenu1, filemenu2, filemenu3,filemenu4);
        FileMenu.getItems().add(3, new SeparatorMenuItem());
        
        Menu EditMenu = new Menu("Edit");
        MenuItem EditMenu1 = new MenuItem("Cut");
        MenuItem EditMenu2 = new MenuItem("Copy");
        MenuItem EditMenu3 = new MenuItem("Paste");
        MenuItem EditMenu4 = new MenuItem("delete");
        MenuItem EditMenu5 = new MenuItem("Select ALL");
        EditMenu.getItems().addAll(EditMenu1, EditMenu2, EditMenu3, EditMenu4, EditMenu5);
        EditMenu.getItems().add(4, new SeparatorMenuItem());
        
        Menu HelpMenu = new Menu("Help");
        MenuItem HelpMenu1 = new MenuItem("About NotePade");
        HelpMenu.getItems().add(HelpMenu1);
        
        root.setTop(menubar);
        root.setCenter(area);
        menubar.getMenus().addAll(FileMenu, EditMenu, HelpMenu);
        stage.setScene(scene);
        stage.show();

    }

    public static void main(String[] args) {
        launch();
    }

}
