#!/bin/bash                                               
                                                          
# Configurable paths                                      
WINDOWS_EFI_PART="/dev/nvme0n1p1"              
# Change if needed                                                  
MOUNT_POINT="/windows"                                    
GRUB_EFI_SOURCE="/efi/EFI/GRUB/grubx64.efi"               
WINDOWS_BOOTLOADER_DIR="$MOUNT_POINT/EFI/Microsoft/Boot"  
ORIGINAL_BACKUP="$WINDOWS_BOOTLOADER_DIR/bootmgfw-windows.efi"                                                     
TARGET_BOOTMGFW="$WINDOWS_BOOTLOADER_DIR/bootmgfw.efi"    
                                                          
echo "Mounting Windows EFI partition..."                  
sudo mkdir -p "$MOUNT_POINT"                              
sudo mount "$WINDOWS_EFI_PART" "$MOUNT_POINT" || { echo "Failed to mount EFI partition"; exit 1; }                 
                                                          
echo "Backing up current bootmgfw.efi to bootmgfw-windows.efi..."                                                  
sudo cp -f "$TARGET_BOOTMGFW" "$ORIGINAL_BACKUP"          
                                                          
echo "Replacing bootmgfw.efi with GRUB's grubx64.efi..."  
sudo cp -f "$GRUB_EFI_SOURCE" "$TARGET_BOOTMGFW"          
                                                          
echo "Unmounting EFI partition..."                        
sudo umount "$MOUNT_POINT"                                
                                                          
echo "GRUB restored successfully over Windows bootmgfw.efi"    
