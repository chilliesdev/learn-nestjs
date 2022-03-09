import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService){}
    @Get()
    getBookmarks(@GetUser('sub') userId: number){
        return this.bookmarkService.getBookmarks(userId);
    }

    @Get(':id')
    getBookmarkbyId(
        @GetUser('sub') userId: number, 
        @Param('id', ParseIntPipe) bookmarkId: number
    ){
        return this.bookmarkService.getBookmarkbyId(userId, bookmarkId);
    }

    @Post()
    createBookmark(
        @GetUser('sub') userId: number, 
        @Body() createBookmarkDto: CreateBookmarkDto
    ){
        return this.bookmarkService.createBookmark(userId, createBookmarkDto);
    }

    @Patch(':id')
    editBookmarkbyId(
        @GetUser('sub') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        @Body() editBookMarkDto: EditBookmarkDto
    ){
        return this.bookmarkService.editBookmarkbyId(userId, bookmarkId, editBookMarkDto);
    }
    
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmarkbyId(
        @GetUser('sub') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number
    ){
        return this.bookmarkService.deleteBookmarkbyId(userId, bookmarkId);
    }
}